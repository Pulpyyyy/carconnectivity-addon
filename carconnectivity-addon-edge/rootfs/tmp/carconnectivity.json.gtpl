{
    "carConnectivity": {
        "log_level": "{{ .log_level }}",
        "connectors": [
            {{- if .connector_username_brand1 }}
            {
                "type": "{{ if or (eq .connector_type_brand1 "seat") (eq .connector_type_brand1 "cupra") }}seatcupra{{ else }}{{ .connector_type_brand1 }}{{ end }}",
                "config": {
                    {{- if or (eq .connector_type_brand1 "seat") (eq .connector_type_brand1 "cupra") }}
                    "brand": "{{ .connector_type_brand1 }}",
                    {{- end }}
                    "username": "{{ .connector_username_brand1 }}",
                    "password": "{{ .connector_password_brand1 }}",
                    "interval": {{ .connector_interval_brand1 }},
                    "spin": "{{ .connector_spin_brand1 }}",
                    "api_log_level": "{{ .api_log_level }}"
                }
            }
            {{- end }}
            {{- if and .connector_username_brand1 .connector_username_brand2 }},{{- end }}
            {{- if .connector_username_brand2 }}
            {
                "type": "{{ if or (eq .connector_type_brand2 "seat") (eq .connector_type_brand2 "cupra") }}seatcupra{{ else }}{{ .connector_type_brand2 }}{{ end }}",
                "connector_id": "{{ .connector_type_brand2 }}2",
                "config": {
                    {{- if or (eq .connector_type_brand2 "seat") (eq .connector_type_brand2 "cupra") }}
                    "brand": "{{ .connector_type_brand2 }}",
                    {{- end }}
                    "username": "{{ .connector_username_brand2 }}",
                    "password": "{{ .connector_password_brand2 }}",
                    "interval": {{ .connector_interval_brand2 }},
                    "spin": "{{ .connector_spin_brand2 }}",
                    "api_log_level": "{{ .api_log_level }}"
                }
            }
            {{- end }}
            {{- if and (or .connector_username_brand1 .connector_username_brand2) .connector_tronity_client_id }},{{- end }}
            {{- if .connector_tronity_client_id }}
            {
                "type": "tronity",
                "config": {
                    "client_id": "{{ .connector_tronity_client_id }}",
                    "client_secret": "{{ .connector_tronity_client_secret }}",
                    "interval": {{ .connector_tronity_interval }},
                    "api_log_level": "{{ .api_log_level }}"
                }
            }
            {{- end }}
            {{- if and (or .connector_username_brand1 .connector_username_brand2) .connector_volvo_key_primary }},{{- end }}
            {{- if .connector_volvo_key_primary }}
            {
                "type": "volvo",
                "config": {
                    "key_primary": "{{ .connector_volvo_key_primary }}",
                    "key_secondary": "{{ .connector_volvo_key_secondary }}",
                    "connected_volvo_vehicle_token": "{{ .connected_volvo_vehicle_token }}",
                    "location_token": "{{ .connector_volvo_location_token }}",
                    "interval": {{ .connector_volvo_interval }},
                    "api_log_level": "{{ .api_log_level }}"
                }
            }
            {{- end }}
        ],
        "plugins": [
            {
                "type": "mqtt",
                "config": {
                    "username": "{{ .mqtt_username }}",
                    "password": "{{ .mqtt_password }}",
                    "broker": "{{ .mqtt_broker }}",
                    "port": {{ .mqtt_port }},
                    "locale": "en_US",
                    "time_format": "%Y-%m-%dT%H:%M:%S%z",
                    "log_level": "{{ .log_level }}"
                }
            },
            {
                "type": "webui",
                {{- if .connector_enabler_webui }}
                    "disabled": false,
                {{- else }}
                    "disabled": true,
                {{- end }}
                "config": {
                    "username": "{{ .connector_username_webui }}",
                    "password": "{{ .connector_password_webui }}",
                    "app_config": {
                        {{- if eq .connector_username_webui "autologin" }}
                            "LOGIN_DISABLED": true
                        {{- else }}
                            "LOGIN_DISABLED": false
                        {{- end }}
                        },
                    "locale": "en_US",
                    "log_level": "{{ .log_level }}"
                }
            },
            {
                "type": "abrp",
                {{- if .connector_enabler_abrp }}
                    "disabled": false,
                {{- else }}
                    "disabled": true,
                {{- end }}
                "config": {
                    "tokens": {
                        {{- $first := true }}
                        {{- range .connector_abrp_tokens }}
                            {{- if not $first }},{{ end }}
                            "{{ .vin }}": "{{ .token }}"
                            {{- $first = false }}
                        {{- end }}
                    },
                    "log_level": "{{ .log_level }}"
                }
            },
            {
                "type": "mqtt_homeassistant",
                "config": {
                    "locale": "en_US",
                    "time_format": "%Y-%m-%dT%H:%M:%S%z",
                    "log_level": "{{ .log_level }}"
                }
            }
        ]
    }
}
