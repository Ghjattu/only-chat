package controllers

import (
	"server/models"
	"server/utils"

	"github.com/gofiber/fiber/v2"
)

func GetAllFriends(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return utils.ErrorHandler(c, err)
	}

	friends, err := models.GetAllFriendsByID(uint(id))
	if err != nil {
		return utils.ErrorHandler(c, err)
	}

	return c.JSON(utils.Response{
		Success: true,
		Code:    fiber.StatusOK,
		Message: "success",
		Data:    friends,
	})
}

func AddFriend(c *fiber.Ctx) error {
	id1, err := c.ParamsInt("id1")
	if err != nil {
		return utils.ErrorHandler(c, err)
	}

	id2, err := c.ParamsInt("id2")
	if err != nil {
		return utils.ErrorHandler(c, err)
	}

	err = models.AddFriend(uint(id1), uint(id2))
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
