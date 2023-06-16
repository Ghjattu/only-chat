package utils

import "github.com/go-playground/validator/v10"

type ErrorResponse struct {
	Field string
	Tag   string
}

// ValidateInput validates inputs that are coming into
// the register endpoint and login endpoint.
func ValidateInput(input interface{}) []*ErrorResponse {
	var errors []*ErrorResponse

	validate := validator.New()
	err := validate.Struct(input)
	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			e := new(ErrorResponse)
			e.Field = err.StructNamespace()
			e.Tag = err.Tag()

			errors = append(errors, e)
		}
	}

	return errors
}
