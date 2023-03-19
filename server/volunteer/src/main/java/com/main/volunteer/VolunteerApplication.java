package com.main.volunteer;

import com.main.volunteer.domain.tag.entity.Tag;
import com.main.volunteer.domain.tag.repository.TagRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class VolunteerApplication {

	public static void main(String[] args) {
		SpringApplication.run(VolunteerApplication.class, args);
	}

//	@Bean
//	public CommandLineRunner dataLoader(TagRepository tagRepository) {
//		return new CommandLineRunner() {
//			@Override
//			public void run(String... args) throws Exception {
//				tagRepository.save(new Tag("어린이"));
//				tagRepository.save(new Tag("어르신"));
//				tagRepository.save(new Tag("장애인"));
//				tagRepository.save(new Tag("동물"));
//				tagRepository.save(new Tag("환경"));
//				tagRepository.save(new Tag("사회"));
//
//			}
//		};
//	}


}
