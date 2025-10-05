ARG BUILD_FROM
FROM ${BUILD_FROM}

ARG BUILD_ARCH
ARG BUILD_DESCRIPTION
ARG BUILD_NAME
ARG BUILD_VERSION
ARG AUDI_VERSION
ARG SEAT_VERSION
ARG SKODA_VERSION
ARG VW_VERSION
ARG TRONITY_VERSION
ARG VOLVO_VERSION
ARG ABRP_VERSION
ARG MQTT_VERSION
ARG MQTTHA_VERSION
ARG WEBUI_VERSION
ARG CC_VERSION

COPY rootfs /
WORKDIR /tmp/

RUN echo "ADDON_VERSION=v${BUILD_VERSION}" >> versions.txt && \
    apk add --no-cache curl nginx py3-pip build-base libffi-dev && \
    python3 -m venv /opt/venv && \
    /opt/venv/bin/pip install --upgrade pip && \
    /opt/venv/bin/pip install --no-cache \
        carconnectivity==${CC_VERSION} \
        carconnectivity-connector-audi==${AUDI_VERSION} \
        carconnectivity-connector-seatcupra==${SEAT_VERSION} \
        carconnectivity-connector-skoda==${SKODA_VERSION} \
        carconnectivity-connector-volkswagen==${VW_VERSION} \
        carconnectivity-connector-tronity==${TRONITY_VERSION} \
        carconnectivity-plugin-abrp==${ABRP_VERSION} \
        carconnectivity-plugin-webui==${WEBUI_VERSION} \
        carconnectivity-plugin-mqtt_homeassistant==${MQTTHA_VERSION} && \
    apk del build-base libffi-dev && \
    echo "CARCONNECTIVITY_VERSION=${CC_VERSION}" >> versions.txt && \
    echo "AUDI_VERSION=${AUDI_VERSION}" >> versions.txt && \
    echo "SEAT_VERSION=${SEAT_VERSION}" >> versions.txt && \
    echo "SKODA_VERSION=${SKODA_VERSION}" >> versions.txt && \
    echo "VW_VERSION=${VW_VERSION}" >> versions.txt && \
    echo "TRONITY_VERSION=${TRONITY_VERSION}" >> versions.txt && \
    echo "VOLVO_VERSION=${VOLVO_VERSION}" >> versions.txt && \
    echo "ABRP_VERSION=${ABRP_VERSION}" >> versions.txt && \
    echo "WEBUI_VERSION=${WEBUI_VERSION}" >> versions.txt && \
    echo "MQTT_VERSION=${MQTT_VERSION}" >> versions.txt && \
    echo "MQTTHA_VERSION=${MQTTHA_VERSION}" >> versions.txt && \
    chmod -R a+rw /tmp && \
    mkdir -p /run/nginx && \
    chmod +x /tmp/entrypoint.sh

LABEL \
    io.hass.name="${BUILD_NAME}" \
    io.hass.description="${BUILD_DESCRIPTION}" \
    io.hass.arch="${BUILD_ARCH}" \
    io.hass.type="addon" \
    io.hass.version="${BUILD_VERSION}" \
    org.opencontainers.image.source="${BUILD_SOURCE}" \
    org.opencontainers.image.description="${BUILD_DESCRIPTION}" \
    org.opencontainers.image.title="${BUILD_NAME}" \
    org.opencontainers.image.created="${BUILD_DATE}" \
    org.opencontainers.image.version="${BUILD_VERSION}"

ENTRYPOINT ["/bin/sh", "-c", "/tmp/entrypoint.sh"]

# HEALTHCHECK --interval=1m CMD \
#     [ -f "/tmp/carconnectivity_healthy" ] && \
#     grep -q "^healthy$" "/tmp/carconnectivity_healthy" && \
#     find "/tmp/carconnectivity_healthy" -mmin -2 | grep -q .
