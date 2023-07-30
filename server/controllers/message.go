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

func CreateNewMessage(c *fiber.Ctx) error {
	m := &models.Message{}

	if err := c.BodyParser(m); err != nil {
		return utils.ErrorHandler(c, err)
	}

	if err := models.CreateNewMessage(m); err != nil {
		return utils.ErrorHandler(c, err)
	}

	return c.JSON(utils.Response{
		Success: true,
		Code:    fiber.StatusOK,
		Message: "success",
		Data:    m.ID,
	})
}

func DeleteMessageByID(c *fiber.Ctx) error {
	id, err := getID(c, "id")
	if err != nil {
		return utils.ErrorHandler(c, err)
	}

	if err := models.DeleteMessageByID(id); err != nil {
		return utils.ErrorHandler(c, err)
	}

	return c.JSON(utils.Response{
		Success: true,
		Code:    fiber.StatusOK,
		Message: "success",
		Data:    nil,
	})
}

func GetAllUnprocessedNotifications(c *fiber.Ctx) error {
	receiverID, err := getID(c, "receiver_id")
	if err != nil {
		return utils.ErrorHandler(c, err)
	}

	messages, err := models.GetAllUnprocessedNotifications(receiverID)
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
