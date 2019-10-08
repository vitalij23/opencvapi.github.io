var spec = 
{
  "swagger": "2.0",
  "info": {
    "description": "Document recognition service. You can find out more  at [https://gitlab.rusnarbank.ru/RNB/opencv](https://gitlab.rusnarbank.ru/RNB/opencv).",
    "version": "1.0.0",
    "title": "opencv",
    "contact": {
      "email": "Chepelev_VS@bel-rusnarbank.ru"
    }
  },
  "tags": [
    {
      "name": "file",
      "description": "Upload file"
    },
    {
      "name": "status",
      "description": "To get result and status"
    }
  ],
  "paths": {
    "/upload": {
      "post": {
        "tags": [
          "file"
        ],
        "summary": "Upload file for recognition",
        "description": "Accepted files: pdf, jpeg, jpg, png",
        "operationId": "uploadFile",
        "consumes": [
          "multipart/form-data"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "formData",
            "name": "file",
            "description": "Pdf with images or single image for recognition",
            "required": true,
            "type": "file"
          }
        ],
        "responses": {
          "200": {
            "description": "File accepted",
            "schema": {
              "$ref": "#/definitions/Id"
            }
          },
          "400": {
            "description": "Invalid input",
            "schema": {
              "$ref": "#/definitions/Exception"
            }
          }
        }
      },
      "get": {
        "tags": [
          "file"
        ],
        "summary": "Form for upload",
        "operationId": "uploadForm",
        "produces": [
          "text/html"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "Form"
          }
        }
      }
    },
    "/get": {
      "get": {
        "tags": [
          "status"
        ],
        "summary": "Status and result",
        "description": "Returnes status and result for uploaded file by id",
        "operationId": "getStatus",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "query",
            "description": "ID of uploaded file",
            "required": true,
            "type": "string",
            "pattern": "^[a-f0-9]{32}$"
          }
        ],
        "responses": {
          "200": {
            "description": "Status with or without result",
            "schema": {
              "$ref": "#/definitions/Response"
            }
          },
          "400": {
            "description": "Invalid key",
            "schema": {
              "$ref": "#/definitions/Exception"
            }
          }
        }
      }
    }
  },
  "definitions": {
    "Id": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "pattern": "^[a-f0-9]{32}$"
        }
      },
      "xml": {
        "name": "Id"
      }
    },
    "Exception": {
      "type": "object",
      "properties": {
        "status": {
          "type": "string",
          "example": "exception"
        },
        "description": {
          "type": "string"
        }
      },
      "xml": {
        "name": "Exception"
      }
    },
    "Response": {
      "type": "object",
      "properties": {
        "status": {
          "type": "string",
          "example": "ready"
        },
        "pages": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "document_type": {
                "type": "integer",
                "format": "int64"
              },
              "qc": {
                "type": "integer",
                "format": "int64"
              }
            }
          }
        }
      },
      "xml": {
        "name": "Response"
      }
    }
  }
}
