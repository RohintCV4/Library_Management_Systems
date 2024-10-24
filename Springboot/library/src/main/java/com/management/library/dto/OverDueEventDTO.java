package com.management.library.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor // Automatically generates a public constructor
public class OverDueEventDTO {
    private String name;
    private String email;
    private String phoneNumber;
    private Long overdue;
    private String address;
}
