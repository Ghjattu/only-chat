package models

import (
	"time"

	"gorm.io/gorm"
)

type Message struct {
	gorm.Model
	FromID    uint      `json:"from" gorm:"index"`
	ToID      uint      `json:"to"`
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

// GetMessagesByUserID gets all messages between id1 and id2.
//
//	@param id1 uint
//	@param id2 uint
//	@return []Message
//	@return error
func GetMessagesByUserID(id1, id2 uint) ([]Message, error) {
	messages := make([]Message, 0)

	err := db.Model(&Message{}).
		Where("from_id = ? AND to_id = ?", id1, id2).
		Or("from_id = ? AND to_id = ?", id1, id2).
		Find(&messages).Error

	if err != nil {
		return []Message{}, err
	}

	return messages, nil
}
