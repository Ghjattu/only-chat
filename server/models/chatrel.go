package models

import (
	"time"

	"gorm.io/gorm"
)

// ChatRel saves chat relationships between users and
// can be used to get the current chat list of a user.
type ChatRel struct {
	gorm.Model
	UserID           uint      `json:"user_id" gorm:"not null;index"`
	FriendID         uint      `json:"friend_id" gorm:"not null"`
	LastMessage      string    `json:"last_msg"`
	LastMsgTimestamp time.Time `json:"last_msg_time"`
	UnreadCount      uint      `json:"unread_count"`
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
