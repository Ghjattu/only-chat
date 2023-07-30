package models

import (
	"time"

	"gorm.io/gorm"
)

// ChatRel saves chat relationships between users and
// can be used to get the current chat list of a user.
type ChatRel struct {
	gorm.Model
	UserID          uint      `json:"user_id" gorm:"not null;index"`
	FriendID        uint      `json:"friend_id" gorm:"not null"`
	FriendUsername  string    `json:"friend_username"`
	LastMessage     string    `json:"last_msg"`
	LastMessageDate time.Time `json:"last_msg_date"`
	LastActiveDate  time.Time `json:"last_active_date"`
	UnreadCount     uint      `json:"unread_count"`
}

// AddChatRel adds a new chat relationship.
//
//	@param cr *ChatRel
//	@return error
func AddChatRel(cr *ChatRel) error {
	err := db.Model(&ChatRel{}).Create(cr).Error

	return err
}

// GetChatListByUserID gets the chat list of a user.
//
//	@param userID uint
//	@return []ChatRel
//	@return error
func GetChatListByUserID(userID uint) ([]ChatRel, error) {
	chatList := make([]ChatRel, 0)

	err := db.Model(&ChatRel{}).Where("user_id = ?", userID).Find(&chatList).Error
	if err != nil {
		return []ChatRel{}, err
	}

	return chatList, nil
}

// DeleteChatRelByID deletes a chat relationship.
//
//	@param id uint
//	@return error
func DeleteChatRelByID(id uint) error {
	if err := db.Delete(&ChatRel{}, id).Error; err != nil {
		return err
	}

	return nil
}

// ResetUnreadCount resets the unread count of a chat relationship.
//
//	@param userID uint
//	@param friendID uint
//	@return error
func ResetUnreadCount(userID, friendID uint) error {
	return db.Model(&ChatRel{}).
		Where("user_id = ? AND friend_id = ?", userID, friendID).
		Update("unread_count", 0).Error
}

// UpdateLastMessageAndUnreadCount updates the last message and unread count of a chat relationship.
//
//	@param userID uint
//	@param friendID uint
//	@param message *Message
//	@return error
func UpdateLastMessageAndUnreadCount(message *Message) error {
	return db.Transaction(func(tx *gorm.DB) error {
		// Insert the message into the database.
		err := CreateNewMessage(message)
		if err != nil {
			return err
		}

		updateColumns := map[string]interface{}{
			"last_message":      message.Content,
			"last_message_date": message.Timestamp,
			"last_active_date":  message.Timestamp,
		}

		// Update the chat relationship of the sender.
		err = tx.Model(&ChatRel{}).
			Where("user_id = ? AND friend_id = ?", message.SenderID, message.ReceiverID).
			Updates(updateColumns).Error
		if err != nil {
			return err
		}

		// Update the chat relationship of the receiver.
		cr := &ChatRel{}
		err = tx.Model(&ChatRel{}).
			Where("user_id = ? AND friend_id = ?", message.ReceiverID, message.SenderID).
			First(cr).Error
		if err != nil {
			// If the chat relationship of the receiver does not exist,
			// create a new one.
			if err == gorm.ErrRecordNotFound {
				// Get the username of the sender.
				sender := &User{}
				err = tx.Model(&User{}).Where("id = ?", message.SenderID).First(sender).Error
				if err == nil {
					updateColumns["user_id"] = message.ReceiverID
					updateColumns["friend_id"] = sender.ID
					updateColumns["friend_username"] = sender.Username
					updateColumns["unread_count"] = 1

					err = tx.Model(&ChatRel{}).Create(updateColumns).Error
				}
			}
			return err
		} else {
			// If the chat relationship of the receiver exists,
			// update the last message and add the unread count.
			updateColumns["unread_count"] = cr.UnreadCount + 1

			err = tx.Model(&ChatRel{}).
				Where("user_id = ? AND friend_id = ?", message.ReceiverID, message.SenderID).
				Updates(updateColumns).Error
		}

		return err
	})
}
