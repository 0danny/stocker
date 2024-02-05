package com.danny.backend.modules;

import org.springframework.web.bind.annotation.RestController;

import com.danny.backend.models.BaseResponse;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.JobParametersInvalidException;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.batch.core.repository.JobRestartException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/v1/module")
public class ModuleController {

    @Autowired
    private BatchConfiguration batchConfiguration;

    @PostMapping("/schedule")
    public ResponseEntity<BaseResponse<String>> scheduleTask(@RequestBody ModuleRequest moduleRequest) {

        batchConfiguration.scheduleJob(moduleRequest.url, moduleRequest.frequency);

        return ResponseEntity.ok(new BaseResponse<>(true, "Task has been scheduled.", null));
    }

}
