package controllers

import (
	"server/models"
	"server/utils"

	"github.com/gofiber/fiber/v2"
)

func GetUsersByKey(c *fiber.Ctx) error {
	key := c.Params("key")
	if key == "" {
		err := fiber.NewError(fiber.StatusBadRequest, "bad request")
		return utils.ErrorHandler(c, err)
	}

	users, err := models.GetUsersByKey(key)
	if err != nil {
		return utils.ErrorHandler(c, err)
	}

	return c.JSON(utils.Response{
		Success: true,
		Code:    fiber.StatusOK,
		Message: "success",
		Data:    users,
	})
}

func GetUserByID(c *fiber.Ctx) error {
	id, err := getID(c, "id")
	if err != nil {
		return utils.ErrorHandler(c, err)
	}

	user, err := models.GetUserByID(id)
	if err != nil {
		return utils.ErrorHandler(c, err)
	}

	return c.JSON(utils.Response{
		Success: true,
		Code:    fiber.StatusOK,
		Message: "success",
		Data:    user,
	})
}

func GetUserByChatID(c *fiber.Ctx) error {
	chatID := c.Params("chatid")
	if chatID == "" {
		err := fiber.NewError(fiber.StatusBadRequest, "bad request")
		return utils.ErrorHandler(c, err)
	}

	user, _, err := models.GetUserByChatID(chatID, false)
	if err != nil {
		return utils.ErrorHandler(c, err)
	}

	return c.JSON(utils.Response{
		Success: true,
		Code:    fiber.StatusOK,
		Message: "success",
		Data:    user,
	})
}
