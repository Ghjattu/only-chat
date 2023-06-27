package models

import (
	"time"

	"gorm.io/gorm"
)

type Message struct {
	gorm.Model
	From      uint      `json:"from"`
	To        uint      `json:"to"`
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
	err := db.Create(m).Error
	return err
}
