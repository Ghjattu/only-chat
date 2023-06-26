package utils

import (
	"server/models"

	"golang.org/x/crypto/bcrypt"
)

// ValidateLogin validates the user's identity and returns the user if it passes.
//
//	@param chatID
//	@param password
//	@return *models.APIUser
//	@return error
func ValidateLogin(chatID, password string) (*models.APIUser, error) {
	// Use the chatID to find the specified user because it is unique.
	user, hashedPassword, err := models.GetUserByChatID(chatID, false)
	if err != nil {
		return &models.APIUser{}, err
	}

	// Check whether the password is correct.
	err = bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	if err != nil {
		return &models.APIUser{}, err
	}

	return user, nil
}
