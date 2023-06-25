package utils

import (
	"server/models"

	"golang.org/x/crypto/bcrypt"
)

// ValidateLogin validates the user's identity and returns the id if it passes.
//
//	@param chatID
//	@param password
//	@return uint "id"
//	@return error
func ValidateLogin(chatID, password string) (uint, error) {
	// Use the chatID to find the specified user because it is unique.
	user, hashedPassword, err := models.GetUserByChatID(chatID, false)
	if err != nil {
		return 0, err
	}

	// Check whether the password is correct.
	err = bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	if err != nil {
		return 0, err
	}

	return user.ID, nil
}
