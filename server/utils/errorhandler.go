package utils

import (
	"errors"

	"github.com/gofiber/fiber/v2"
	"github.com/mattn/go-sqlite3"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// ErrorHandler returns the corresponding response based on the error type.
var ErrorHandler = func(c *fiber.Ctx, err error) error {
	// default response
	code := fiber.StatusInternalServerError
	res := Response{
		Success: false,
		Code:    code,
		Message: "internal server error",
		Data:    nil,
	}

	// if err is a *fiber.Error
	var e *fiber.Error
	if errors.As(err, &e) {
		code = e.Code
		res.Code = code
		res.Message = e.Message
	}

	// record not found error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		code = fiber.StatusNotFound
		res.Code = code
		res.Message = "record not found"
	}

	// password incorrect error
	if errors.Is(err, bcrypt.ErrMismatchedHashAndPassword) {
		code = fiber.StatusUnauthorized
		res.Code = code
		res.Message = "password incorrect"
	}

	// violate unique constraint
	if v, ok := err.(sqlite3.Error); ok && sqlite3.ErrNo(v.ExtendedCode) == sqlite3.ErrNo(sqlite3.ErrConstraintUnique) {
		code = fiber.StatusBadRequest
		res.Code = code
		res.Message = "chat id must be unique"
	}

	// violate not null constraint
	if v, ok := err.(sqlite3.Error); ok && sqlite3.ErrNo(v.ExtendedCode) == sqlite3.ErrNo(sqlite3.ErrConstraintNotNull) {
		code = fiber.StatusBadRequest
		res.Code = code
		res.Message = "violation of not null constraint"
	}

	return c.Status(code).JSON(res)
}
