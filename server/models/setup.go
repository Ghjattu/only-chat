package models

import (
	"server/middleware/redis"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

// init connects and initializes the database.
func init() {
	d, err := gorm.Open(sqlite.Open("chat.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	db = d

	db.AutoMigrate(&User{}, &Message{}, &FriendRel{}, &ChatRel{})

	redis.InitRdb()

	chatIDs, err := GetAllChatIDs()
	if err == nil {
		redis.Rdb.SAdd(redis.Ctx, "exist_chat_ids", chatIDs)
	}

	go redis.ListenForChatIDPoolChange()
}
