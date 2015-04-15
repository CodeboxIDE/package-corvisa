module.exports = codebox.settings.schema("corvisa",
    {
        "title": "Corvisa",
        "type": "object",
        "properties": {
            "number": {
                "title": "Your Phone Number",
                "type": "string"
            },
            "autocomplete": {
                "title": "Enable autocomplete",
                "type": "boolean",
                "default": true
            }
        }
    }
);
