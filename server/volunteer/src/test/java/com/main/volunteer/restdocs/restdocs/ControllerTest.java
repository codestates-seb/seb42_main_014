//package com.main.volunteer.restdocs.restdocs;
//
//
//import com.google.gson.Gson;
//import com.main.volunteer.domain.member.dto.MemberDto;
//import com.main.volunteer.domain.member.entity.Member;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.context.annotation.Import;
//import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
//import org.springframework.restdocs.RestDocumentationContextProvider;
//import org.springframework.restdocs.RestDocumentationExtension;
//import org.springframework.restdocs.mockmvc.MockMvcRestDocumentation;
//import org.springframework.restdocs.mockmvc.RestDocumentationResultHandler;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//import org.springframework.web.context.WebApplicationContext;
//import org.springframework.web.filter.CharacterEncodingFilter;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@Import(RestDocsConfig.class)
//@ExtendWith({RestDocumentationExtension.class, SpringExtension.class})
//@MockBean(JpaMetamodelMappingContext.class)
//public abstract class ControllerTest {
//    @Autowired
//    protected MockMvc mockMvc;
//
//    @Autowired
//    protected Gson gson;
//
//    @Autowired
//    protected RestDocumentationResultHandler restDocs;
//
//    @BeforeEach
//    void setUp(final WebApplicationContext ctx, final RestDocumentationContextProvider provider) {
//        this.mockMvc = MockMvcBuilders.webAppContextSetup(ctx)
//                .apply(MockMvcRestDocumentation.documentationConfiguration(provider))
//                .alwaysDo(MockMvcResultHandlers.print())
//                .alwaysDo(restDocs)
//                .addFilters(new CharacterEncodingFilter("UTF-8", true))
//                .build();
//    }
//
//    public Map<String, Object> memberResource() {
//        Map<String, Object> memberMap = new HashMap<>();
//
//
//        Member member = new Member();
//        member.setMemberId(1L);
//
//        MemberDto.Response memberDtoResponse =
//                new MemberDto.Response(1L, "test@test.com", true, "password", "test", "profileImage", "orgAddress", 1L, true,  List.of("ORG"), 0, Member.MemberStatus.MEMBER_ACTIVE);
//
//
//        memberMap.put("Member", member);
//        memberMap.put("MemberDtoResponse", memberDtoResponse);
//
//        return memberMap;
//    }
//
//
//}
