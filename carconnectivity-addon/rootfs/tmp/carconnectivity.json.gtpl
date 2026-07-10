{
    "carConnectivity": {
        "log_level": "{{ .logs.level }}",
        "connectors": [
            {{- if .brand1.username }}
            {
                "type": "{{ if or (eq .brand1.type "seat") (eq .brand1.type "cupra") }}seatcupra{{ else }}{{ .brand1.type }}{{ end }}",
                "config": {
                    {{- if and .logs.advanced.brand1.log_level (ne .logs.advanced.brand1.log_level "default") }}
                    "log_level": "{{ .logs.advanced.brand1.log_level }}",
                    {{- end }}
                    {{- if or (eq .brand1.type "seat") (eq .brand1.type "cupra") }}
                    "brand": "{{ .brand1.type }}",
                    {{- end }}
                    {{- if eq .brand1.type "volkswagen_na" }}
                    "country": "__NA_COUNTRY__",
                    {{- end }}
                    "username": "{{ .brand1.username }}",
                    "password": "{{ .brand1.password }}",
                    "interval": {{ .brand1.interval }},
                    "spin": "{{ .brand1.spin }}",
                    "api_log_level": "{{ if and .logs.advanced.brand1.api_log_level (ne .logs.advanced.brand1.api_log_level "default") }}{{ .logs.advanced.brand1.api_log_level }}{{ else }}{{ .logs.api_level }}{{ end }}"
                }
            }
            {{- end }}
            {{- if and .brand1.username .brand2.username }},{{- end }}
            {{- if .brand2.username }}
            {
                "type": "{{ if or (eq .brand2.type "seat") (eq .brand2.type "cupra") }}seatcupra{{ else }}{{ .brand2.type }}{{ end }}",
                "connector_id": "{{ .brand2.type }}2",
                "config": {
                    {{- if and .logs.advanced.brand2.log_level (ne .logs.advanced.brand2.log_level "default") }}
                    "log_level": "{{ .logs.advanced.brand2.log_level }}",
                    {{- end }}
                    {{- if or (eq .brand2.type "seat") (eq .brand2.type "cupra") }}
                    "brand": "{{ .brand2.type }}",
                    {{- end }}
                    {{- if eq .brand2.type "volkswagen_na" }}
                    "country": "__NA_COUNTRY__",
                    {{- end }}
                    "username": "{{ .brand2.username }}",
                    "password": "{{ .brand2.password }}",
                    "interval": {{ .brand2.interval }},
                    "spin": "{{ .brand2.spin }}",
                    "api_log_level": "{{ if and .logs.advanced.brand2.api_log_level (ne .logs.advanced.brand2.api_log_level "default") }}{{ .logs.advanced.brand2.api_log_level }}{{ else }}{{ .logs.api_level }}{{ end }}"
                }
            }
            {{- end }}
            {{- if and (or .brand1.username .brand2.username) .volvo.key_primary }},{{- end }}
            {{- if .volvo.key_primary }}
            {
                "type": "volvo",
                "config": {
                    {{- if and .logs.advanced.volvo.log_level (ne .logs.advanced.volvo.log_level "default") }}
                    "log_level": "{{ .logs.advanced.volvo.log_level }}",
                    {{- end }}
                    "key_primary": "{{ .volvo.key_primary }}",
                    "key_secondary": "{{ .volvo.key_secondary }}",
                    "connected_volvo_vehicle_token": "{{ .volvo.vehicle_token }}",
                    "location_token": "{{ .volvo.location_token }}",
                    "interval": {{ .volvo.interval }},
                    "api_log_level": "{{ if and .logs.advanced.volvo.api_log_level (ne .logs.advanced.volvo.api_log_level "default") }}{{ .logs.advanced.volvo.api_log_level }}{{ else }}{{ .logs.api_level }}{{ end }}"
                }
            }
            {{- end }}
            {{- if .vw_eu_data_act }}
            {{- if .vw_eu_data_act.username }}
            {{- if or .brand1.username .brand2.username .volvo.key_primary }},{{- end }}
            {
                "type": "vw_eu_data_act",
                "config": {
                    "username": "{{ .vw_eu_data_act.username }}",
                    "password": "{{ .vw_eu_data_act.password }}",
                    "country": "__HA_COUNTRY__",
                    "language": "__HA_LANG__",
                    "brand": "VOLKSWAGEN_PASSENGER_CARS",
                    "interval": 900,
                    "api_log_level": "{{ .logs.api_level }}"
                }
            }
            {{- end }}
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
                    "log_level": "{{ if and .logs.advanced.mqtt.log_level (ne .logs.advanced.mqtt.log_level "default") }}{{ .logs.advanced.mqtt.log_level }}{{ else }}{{ .logs.level }}{{ end }}"
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
                    "log_level": "{{ if and .logs.advanced.webui.log_level (ne .logs.advanced.webui.log_level "default") }}{{ .logs.advanced.webui.log_level }}{{ else }}{{ .logs.level }}{{ end }}"
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
                    "log_level": "{{ if and .logs.advanced.abrp.log_level (ne .logs.advanced.abrp.log_level "default") }}{{ .logs.advanced.abrp.log_level }}{{ else }}{{ .logs.level }}{{ end }}"
                }
            },
            {
                "type": "mqtt_homeassistant",
                "config": {
                    "locale": "en_US",
                    "time_format": "%Y-%m-%dT%H:%M:%S%z",
                    "log_level": "{{ if and .logs.advanced.mqtt_homeassistant.log_level (ne .logs.advanced.mqtt_homeassistant.log_level "default") }}{{ .logs.advanced.mqtt_homeassistant.log_level }}{{ else }}{{ .logs.level }}{{ end }}"
                }
            }
        ]
    }
}
