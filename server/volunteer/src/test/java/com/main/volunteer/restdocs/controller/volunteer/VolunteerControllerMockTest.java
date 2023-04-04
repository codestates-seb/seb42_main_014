//package com.main.volunteer.restdocs.controller.volunteer;
//
//import com.google.gson.Gson;
//import com.main.volunteer.domain.volunteer.controller.VolunteerController;
//import com.main.volunteer.domain.volunteer.entity.Volunteer;
//import com.main.volunteer.domain.volunteer.mapper.VolunteerMapper;
//import com.main.volunteer.domain.volunteer.service.VolunteerService;
//import com.main.volunteer.restdocs.restdocs.ControllerTest;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
//import org.springframework.test.web.servlet.MockMvc;
//
//import java.time.LocalDateTime;
//import java.util.Map;
//
//@WebMvcTest(VolunteerController.class)
//@MockBean(JpaMetamodelMappingContext.class)
//@AutoConfigureRestDocs
//public class VolunteerControllerMockTest extends ControllerTest {
//
//    private static final String DEFAULT_URI = "/volunteers";
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private VolunteerService volunteerService;
//
//    @MockBean
//    private VolunteerMapper volunteerMapper;
//
//    @Autowired
//    private Gson gson;
//
//    private Map<String, Object> memberResource;
//    private Volunteer volunteer;
//
//    @BeforeEach
//    void setUp(){
//        memberResource = memberResource();
//        LocalDateTime now = LocalDateTime.now();
//
////        volunteer = new Volunteer();
////        volunteer.setVolunteerId(1L);
////        volunteer.setTitle("보육원 봉사 활동 같이 해요");
////        volunteer.setVolunteerImage("https://main014-bucket.s3.ap-northeast-2.amazonaws.com/profile/e1a835e3-2685-4b4d-977d-3980a6e3c3cc%ED%95%9C%EA%B8%80%EC%9D%B4%EB%A6%84%EC%9D%BC%EB%95%90.png");
////        volunteer.setApplyDate("2023-03-27T13:00");
////        volunteer.setVolunteerDate("2023-04-01T13:00");
////        volunteer.setVolunteerTime(3);
////        volunteer.setPlace("경기도 수원시");
////        volunteer.setContent("보육원에서 함께 아이들과 즐거운 시간을 보내실 분을 모집합니다.");
////        volunteer.setApplyLimit(10);
////        volunteer.setTag();
////                10,
////                "어린이");
//
//    }
//
//    @Test
//    public void postVolunteerTest() throws Exception{
//        //given
//
//        //when
//
//        //then
//    }
//}
