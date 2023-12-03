package com.danny.backend.models;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import lombok.Data;

@Data
public class BaseResponse<T> {
    private Boolean status;
    private String message;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private LocalDateTime timeStamp;
    private T payload;

    public BaseResponse(Boolean status, String message, T payload) {
        this.timeStamp = LocalDateTime.now();
        this.status = status;
        this.message = message;
        this.payload = payload;
    }

    public BaseResponse() {
        this.timeStamp = LocalDateTime.now();
    }
}