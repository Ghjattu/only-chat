package models

import (
	"gorm.io/gorm"
)

type Friend struct {
	gorm.Model
	UserID   uint `gorm:"not null;index"`
	FriendID uint `gorm:"not null"`
}

// AddFriend established a two-way friend relationship between two users.
//
//	@param id1 uint "first user's id"
//	@param id2 uint "second user's id"
//	@return error
func AddFriend(id1, id2 uint) error {
	tx := db.Begin()

	if err := tx.Error; err != nil {
		return err
	}

	r1 := &Friend{UserID: id1, FriendID: id2}
	r2 := &Friend{UserID: id2, FriendID: id1}

	if err := tx.Model(&Friend{}).Create(r1).Error; err != nil {
		tx.Rollback()
		return err
	}
	if err := tx.Model(&Friend{}).Create(r2).Error; err != nil {
		tx.Rollback()
		return err
	}

	err := tx.Commit().Error
	if err != nil {
		tx.Rollback()
		return err
	}

	return nil
}

// GetAllFriendsByID gets all of the user's friends by user id.
//
//	@param id uint
//	@return []APIUser
//	@return error
func GetAllFriendsByID(id uint) ([]APIUser, error) {
	friendIDs := make([]uint, 0)

	err := db.Model(&Friend{}).Where("user_id = ?", id).Select("friend_id").Find(&friendIDs).Error
	if err != nil {
		return []APIUser{}, err
	}

	friends := make([]APIUser, 0)

	for _, friendID := range friendIDs {
		friend := &APIUser{}

		err := db.Model(&User{}).Where("id = ?", friendID).First(friend).Error
		if err != nil {
			return []APIUser{}, err
		}

		friends = append(friends, *friend)
	}

	return friends, nil
}
