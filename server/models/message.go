package models

import (
	"time"

	"gorm.io/gorm"
)

type Message struct {
	gorm.Model
	FromID    uint      `json:"from_id" gorm:"index"`
	ToID      uint      `json:"to_id"`
	Timestamp time.Time `json:"timestamp"`
	Content   string    `json:"content"`
}

// BeforeCreate is a gorm hook that modifies the timestamp to local time.
func (m *Message) BeforeCreate(tx *gorm.DB) error {
	// the timestamp obtained from the frontend has a timezone of UTC+0,
	// so here modify the timestamp to local time.
	m.Timestamp = m.Timestamp.Local()

	return nil
}

// CreateNewMessage creates a new Message.
//
//	@param m *Message
//	@return error
func CreateNewMessage(m *Message) error {
	err := db.Model(&Message{}).Create(m).Error
	return err
}

// GetMessagesByUserID gets all messages between user_id and friend_id.
//
//	@param user_id uint
//	@param friend_id uint
//	@return []Message
//	@return error
func GetMessagesByUserID(user_id, friend_id uint) ([]Message, error) {
	messages := make([]Message, 0)

	err := db.Model(&Message{}).
		Where("from_id = ? AND to_id = ?", user_id, friend_id).
		Or("from_id = ? AND to_id = ?", friend_id, user_id).
		Find(&messages).Error

	if err != nil {
		return []Message{}, err
	}

	return messages, nil
}
