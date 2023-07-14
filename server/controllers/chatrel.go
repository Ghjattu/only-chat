package controllers

import (
	"server/models"
	"server/utils"

	"github.com/gofiber/fiber/v2"
)

func AddChatRel(c *fiber.Ctx) error {
	cr := &models.ChatRel{}

	if err := c.BodyParser(cr); err != nil {
		return utils.ErrorHandler(c, err)
	}

	if err := models.AddChatRel(cr); err != nil {
		return utils.ErrorHandler(c, err)
	}

	return c.JSON(utils.Response{
		Success: true,
		Code:    fiber.StatusOK,
		Message: "success",
		Data:    nil,
	})
}

func GetChatListByUserID(c *fiber.Ctx) error {
	id, err := getID(c, "user_id")
	if err != nil {
		return utils.ErrorHandler(c, err)
	}

	chatList, err := models.GetChatListByUserID(id)
	if err != nil {
		return utils.ErrorHandler(c, err)
	}

	return c.JSON(utils.Response{
		Success: true,
		Code:    fiber.StatusOK,
		Message: "success",
		Data:    chatList,
	})
}

func DeleteChatRelByID(c *fiber.Ctx) error {
	id, err := getID(c, "id")
	if err != nil {
		return utils.ErrorHandler(c, err)
	}

	err = models.DeleteChatRelByID(id)
	if err != nil {
		return utils.ErrorHandler(c, err)
	}

	return c.JSON(utils.Response{
		Success: true,
		Code:    fiber.StatusOK,
		Message: "success",
		Data:    nil,
	})
}
