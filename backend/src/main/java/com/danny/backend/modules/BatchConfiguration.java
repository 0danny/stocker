package com.danny.backend.modules;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobParameter;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.launch.support.TaskExecutorJobLauncher;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.repository.support.JobRepositoryFactoryBean;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.batch.support.transaction.ResourcelessTransactionManager;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.SimpleAsyncTaskExecutor;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableBatchProcessing
@SuppressWarnings("null")
public class BatchConfiguration {

    private Logger logger = LoggerFactory.getLogger(BatchConfiguration.class);

    public HashMap<String, ArrayList<String>> scheduledJobs = new HashMap<>() {
        {
            put("daily", new ArrayList<>());
            put("hourly", new ArrayList<>());
            put("every30", new ArrayList<>());
            put("every15", new ArrayList<>());
        }
    };

    public ResourcelessTransactionManager transactionManager() {
        return new ResourcelessTransactionManager();
    }

    public DataSource dataSource() {
        return new EmbeddedDatabaseBuilder()
                .setType(EmbeddedDatabaseType.H2)
                .addScript("/org/springframework/batch/core/schema-drop-h2.sql")
                .addScript("/org/springframework/batch/core/schema-h2.sql")
                .build();
    }

    public JobRepository jobRepository() throws Exception {
        JobRepositoryFactoryBean jobRepository = new JobRepositoryFactoryBean();
        jobRepository.setDataSource(dataSource());
        jobRepository.setTransactionManager(transactionManager());
        jobRepository.afterPropertiesSet();
        return jobRepository.getObject();
    }

    public TaskExecutorJobLauncher jobLauncher() throws Exception {
        TaskExecutorJobLauncher jobLauncher = new TaskExecutorJobLauncher();
        jobLauncher.setJobRepository(jobRepository());
        jobLauncher.afterPropertiesSet();
        return jobLauncher;
    }

    public Step step(JobRepository jobRepository) {
        StepBuilder stepBuilderOne = new StepBuilder("step1", jobRepository);
        return stepBuilderOne.tasklet(businessTasklet(), transactionManager())
                .taskExecutor(new SimpleAsyncTaskExecutor())
                .build();
    }

    public Tasklet businessTasklet() {
        return (StepContribution contribution, ChunkContext chunkContext) -> {
            // get the "JobID" from the job parameters

            JobParameters jobParameters = chunkContext.getStepContext().getStepExecution().getJobParameters();

            logger.info("Hello, World from: " + jobParameters.getString("url"));
            return RepeatStatus.FINISHED;
        };
    }

    public Job job(String jobName, JobRepository jobRepository) {
        return new JobBuilder(jobName, jobRepository)
                .start(step(jobRepository))
                .build();
    }

    public void runBatchTask(String url) {
        try {
            JobLauncher jobLauncher = jobLauncher();

            JobParametersBuilder jobParametersBuilder = new JobParametersBuilder();
            jobParametersBuilder.addString("url", url);

            // Get current time in milliseconds
            String time = String.valueOf(System.currentTimeMillis());

            Job job = job(time, jobRepository());

            logger.info("Job: " + job.getName() + " scheduled.");

            jobLauncher.run(job, jobParametersBuilder.toJobParameters());
        } catch (Exception e) {
            System.out.println(e.getStackTrace());
        }
    }

    public void scheduleJob(String url, String frequency) {
        // Find the frequency in the dictionary.

        if (scheduledJobs.containsKey(frequency)) {
            scheduledJobs.get(frequency).add(url);
        } else {
            logger.info("Frequency: " + frequency + " not found");
        }
    }

    @Scheduled(fixedRate = 86400000) // daily
    public void dailyJob() throws Exception {

    }

    @Scheduled(fixedRate = 3600000) // hourly
    public void hourlyJob() throws Exception {
        // executeJob();
    }

    @Scheduled(fixedRate = 1800000) // every 30 minutes
    public void every30MinutesJob() throws Exception {
        // executeJob();
    }

    @Scheduled(fixedRate = 900000) // every 15 minutes
    public void every15MinutesJob() throws Exception {
        // executeJob();
    }

    @Scheduled(fixedRate = 60000) // every minute
    public void everyMinuteJob() throws Exception {
        logger.info("We have: " + scheduledJobs.get("daily").size() + " daily jobs.");

        for (String url : scheduledJobs.get("daily")) {
            runBatchTask(url);
        }
    }
}
