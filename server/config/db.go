package config

import (
	"server/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// DatabaseSetup connects and initializes the database.
func DatabaseSetup() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("chat.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	db.AutoMigrate(&models.User{}, &models.Message{})

	return db
}
