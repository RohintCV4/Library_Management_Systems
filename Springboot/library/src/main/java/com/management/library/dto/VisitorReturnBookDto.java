package com.management.library.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VisitorReturnBookDto {
    private String name;
    private String email;
    private String phoneNumber;
    private String createdAt;
    private String address;
    private String BookCount;
}
