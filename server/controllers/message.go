package controllers

import (
	"server/models"
	"server/utils"

	"github.com/gofiber/fiber/v2"
)

func GetMessagesByUserID(c *fiber.Ctx) error {
	user_id, err := getID(c, "user_id")
	if err != nil {
		return utils.ErrorHandler(c, err)
	}

	friend_id, err := getID(c, "friend_id")
	if err != nil {
		return utils.ErrorHandler(c, err)
	}

	messages, err := models.GetMessagesByUserID(user_id, friend_id)
	if err != nil {
		return utils.ErrorHandler(c, err)
	}

	return c.JSON(utils.Response{
		Success: true,
		Code:    fiber.StatusOK,
		Message: "success",
		Data:    messages,
	})
}
