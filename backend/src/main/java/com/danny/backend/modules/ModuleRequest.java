package com.danny.backend.modules;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class ModuleRequest {

    @NotBlank
    public String url;

    @NotBlank
    public String frequency;
}
