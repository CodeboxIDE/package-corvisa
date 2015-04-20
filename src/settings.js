module.exports = codebox.settings.schema("corvisa",
    {
        "title": "Corvisa",
        "type": "object",
        "properties": {
            "number": {
                "title": "Your Phone Number",
                "type": "string"
            },
            "autocompletion": {
                "title": "Enable Summit autocompletions",
                "type": "boolean",
                "default": true
            }
        }
    }
);
