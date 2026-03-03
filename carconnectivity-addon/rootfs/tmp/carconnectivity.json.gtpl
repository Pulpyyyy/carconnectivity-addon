{
    "carConnectivity": {
        "log_level": "{{ .logs.level }}",
        "connectors": [
            {{- if .brand1.username }}
            {
                "type": "{{ if or (eq .brand1.type "seat") (eq .brand1.type "cupra") }}seatcupra{{ else }}{{ .brand1.type }}{{ end }}",
                "config": {
                    {{- if or (eq .brand1.type "seat") (eq .brand1.type "cupra") }}
                    "brand": "{{ .brand1.type }}",
                    {{- end }}
                    {{- if eq .brand1.type "volkswagen_na" }}
                    "country": "us",
                    {{- end }}
                    "username": "{{ .brand1.username }}",
                    "password": "{{ .brand1.password }}",
                    "interval": {{ .brand1.interval }},
                    "spin": "{{ .brand1.spin }}",
                    "api_log_level": "{{ .logs.api_level }}"
                }
            }
            {{- end }}
            {{- if and .brand1.username .brand2.username }},{{- end }}
            {{- if .brand2.username }}
            {
                "type": "{{ if or (eq .brand2.type "seat") (eq .brand2.type "cupra") }}seatcupra{{ else }}{{ .brand2.type }}{{ end }}",
                "connector_id": "{{ .brand2.type }}2",
                "config": {
                    {{- if or (eq .brand2.type "seat") (eq .brand2.type "cupra") }}
                    "brand": "{{ .brand2.type }}",
                    {{- end }}
                    {{- if eq .brand2.type "volkswagen_na" }}
                    "country": "us",
                    {{- end }}
                    "username": "{{ .brand2.username }}",
                    "password": "{{ .brand2.password }}",
                    "interval": {{ .brand2.interval }},
                    "spin": "{{ .brand2.spin }}",
                    "api_log_level": "{{ .logs.api_level }}"
                }
            }
            {{- end }}
            {{- if and (or .brand1.username .brand2.username) .volvo.key_primary }},{{- end }}
            {{- if .volvo.key_primary }}
            {
                "type": "volvo",
                "config": {
                    "key_primary": "{{ .volvo.key_primary }}",
                    "key_secondary": "{{ .volvo.key_secondary }}",
                    "connected_volvo_vehicle_token": "{{ .volvo.vehicle_token }}",
                    "location_token": "{{ .volvo.location_token }}",
                    "interval": {{ .volvo.interval }},
                    "api_log_level": "{{ .logs.api_level }}"
                }
            }
            {{- end }}
        ],
        "plugins": [
            {
                "type": "mqtt",
                "config": {
                    "username": "{{ .mqtt.username }}",
                    "password": "{{ .mqtt.password }}",
                    "broker": "{{ .mqtt.broker }}",
                    "port": {{ .mqtt.port }},
                    "locale": "en_US",
                    "time_format": "%Y-%m-%dT%H:%M:%S%z",
                    "log_level": "{{ .logs.level }}"
                }
            },
            {
                "type": "webui",
                {{- if .webui.enabled }}
                    "disabled": false,
                {{- else }}
                    "disabled": true,
                {{- end }}
                "config": {
                    "username": "{{ .webui.username }}",
                    "password": "{{ .webui.password }}",
                    "app_config": {
                        {{- if eq .webui.username "autologin" }}
                            "LOGIN_DISABLED": true
                        {{- else }}
                            "LOGIN_DISABLED": false
                        {{- end }}
                        },
                    "locale": "en_US",
                    "log_level": "{{ .logs.level }}"
                }
            },
            {
                "type": "abrp",
                {{- if .abrp.enabled }}
                    "disabled": false,
                {{- else }}
                    "disabled": true,
                {{- end }}
                "config": {
                    "tokens": {
                        {{- $first := true }}
                        {{- range .abrp.tokens }}
                            {{- if not $first }},{{ end }}
                            "{{ .vin }}": "{{ .token }}"
                            {{- $first = false }}
                        {{- end }}
                    },
                    "log_level": "{{ .logs.level }}"
                }
            },
            {
                "type": "mqtt_homeassistant",
                "config": {
                    "locale": "en_US",
                    "time_format": "%Y-%m-%dT%H:%M:%S%z",
                    "log_level": "{{ .logs.level }}"
                }
            }
        ]
    }
}
