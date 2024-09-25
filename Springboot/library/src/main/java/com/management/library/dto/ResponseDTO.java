package com.management.library.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ResponseDTO {

    private String message;
    private Object data;
    private Integer statusCode;

}
