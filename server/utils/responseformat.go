package utils

// Response defines a uniform format for the data returned by the server.
type Response struct {
	Success bool        `json:"success"`
	Code    int         `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

func ResponseFormat(success bool, code int, message string, data interface{}) *Response {
	return &Response{
		success,
		code,
		message,
		data,
	}
}
