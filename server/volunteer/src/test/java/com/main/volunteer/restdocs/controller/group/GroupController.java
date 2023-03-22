package com.main.volunteer.restdocs.controller.group;

import com.google.gson.Gson;
import com.main.volunteer.domain.group.dto.GroupDto;
import com.main.volunteer.domain.group.entity.Group;
import com.main.volunteer.domain.group.mapper.GroupMapper;
import com.main.volunteer.domain.group.service.GroupService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;

import static com.main.volunteer.utils.ApiDocumentUtils.getRequestPreProcessor;
import static com.main.volunteer.utils.ApiDocumentUtils.getResponsePreProcessor;
import static org.hamcrest.Matchers.*;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;

@WebMvcTest(GroupController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
public class GroupController {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private GroupService groupService;

    @MockBean
    private GroupMapper groupMapper;

    @Autowired
    private Gson gson;

    @Test
    public void postGroupTest() throws Exception {
        //given
        GroupDto.Post post = new GroupDto.Post("좀나세","example.png",10,"서울","그룹생성 테스트 입니다","어린이");
        String content = gson.toJson(post);

        GroupDto.Response responseDto =
                new GroupDto.Response(
                        1L,
                        "좀나세",
                        "example.png",
                        1L,
                        10,
                        "서울",
                        "그룹생성 테스트 입니다",
                        1,
                        "어린이");

        given(groupMapper.groupPostDtoToGroup(Mockito.any(GroupDto.Post.class))).willReturn(new Group());
        Group resultGroup = new Group();
        resultGroup.setGroupId(1L);

        given(groupService.createGroup(Mockito.any(Group.class))).willReturn(resultGroup);

        given(groupMapper.groupToGroupResponseDto(Mockito.any(Group.class))).willReturn(responseDto);

        //when
        ResultActions actions =
                mockMvc.perform(
                        post("/groups")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        //then
        actions
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", is(startsWith("/groups"))))
                .andDo(document("post-group",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("groupName").type(JsonFieldType.STRING).description("그룹 이름"),
                                        fieldWithPath("groupImage").type(JsonFieldType.STRING).description("그룹 프로필 이미지"),
                                        fieldWithPath("applyLimit").type(JsonFieldType.STRING).description("인원 제한"),
                                        fieldWithPath("place").type(JsonFieldType.STRING).description("장소"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("내용"),
                                        fieldWithPath("tagName").type(JsonFieldType.STRING).description("태그 이름")
                                )
                        ),
                        responseHeaders(
                                headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                        )

                ));
    }
    @Test
    public void updateGroupTest() throws Exception {
        
    }

}
