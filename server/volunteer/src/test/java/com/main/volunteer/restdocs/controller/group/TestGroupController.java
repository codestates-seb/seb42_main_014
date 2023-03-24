package com.main.volunteer.restdocs.controller.group;

import com.google.gson.Gson;
import com.main.volunteer.domain.group.controller.GroupController;
import com.main.volunteer.domain.group.dto.GroupDto;
import com.main.volunteer.domain.group.entity.Group;
import com.main.volunteer.domain.group.mapper.GroupMapper;
import com.main.volunteer.domain.group.service.GroupService;
import com.main.volunteer.domain.member.entity.Member;
import com.main.volunteer.domain.member.repository.MemberRepository;
import com.main.volunteer.domain.member.service.MemberService;
import com.main.volunteer.domain.point.entity.Point;
import com.main.volunteer.domain.tag.repository.TagRepository;
import com.main.volunteer.domain.tag.service.TagService;
import com.main.volunteer.restdocs.controller.group.group.GroupControllerHelper;
import com.main.volunteer.restdocs.controller.group.group.Stub;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import javax.annotation.PostConstruct;
import java.util.Collections;
import java.util.List;

import static com.main.volunteer.utils.ApiDocumentUtils.getRequestPreProcessor;
import static com.main.volunteer.utils.ApiDocumentUtils.getResponsePreProcessor;
import static org.hamcrest.Matchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;

@WebMvcTest(GroupController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
public class TestGroupController implements GroupControllerHelper {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private GroupService groupService;

    @MockBean
    private TagService tagService;

    @MockBean
    private MemberService memberService;

    @MockBean
    private GroupMapper groupMapper;
    @MockBean
    private TagRepository tagRepository;

    @MockBean
    private MemberRepository memberRepository;

    @Autowired
    private Gson gson;

    @Test
    public void postGroupTest() throws Exception {
        //given
        GroupDto.Post postGroup = (GroupDto.Post) Stub.MockGroup.getRequestBody(HttpMethod.POST);
        String content = gson.toJson(postGroup);

        GroupDto.Response responseDto = Stub.MockGroup.getSingleResponseBody();

        given(groupMapper.groupPostDtoToGroup(Mockito.any(GroupDto.Post.class))).willReturn(new Group());
        Group resultGroup = new Group();
        resultGroup.setGroupId(1L);
        given(groupService.createGroup(Mockito.any(Group.class))).willReturn(resultGroup);

        given(groupMapper.groupToGroupResponseDto(Mockito.any(Group.class), Mockito.anyBoolean())).willReturn(responseDto);

        //when
        ResultActions actions =
                mockMvc.perform(postRequest(getUrl(), content));

        //then
        actions
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", is(startsWith("/groups"))))
                .andDo(document("post-group",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                getGroupPostRequestDescriptors()
                        ),
                        responseHeaders(
                                headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                        )

                ));
    }
    @Test
    public void updateGroupTest() throws Exception {
        //given
        long groupId =1L;
        GroupDto.Patch updateGroup = (GroupDto.Patch) Stub.MockGroup.getRequestBody(HttpMethod.PATCH);
        String content = gson.toJson(updateGroup);

        GroupDto.Response responseDto = Stub.MockGroup.getSingleResponseBody();

        given(groupMapper.groupPatchDtoToGroup(Mockito.any(GroupDto.Patch.class))).willReturn(new Group());
        given(groupService.findGroup(Mockito.anyLong())).willReturn(new Group());
        given(groupMapper.groupToGroupResponseDto(Mockito.any(Group.class), Mockito.anyBoolean())).willReturn(responseDto);

        //when
        ResultActions actions =
                mockMvc.perform(patchRequest(getUrl(), groupId, content));

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.groupId").value(updateGroup.getGroupId()))
                .andExpect(jsonPath("$.data.groupName").value(updateGroup.getGroupName()))
                .andExpect(jsonPath("$.data.groupImage").value(updateGroup.getGroupImage()))
                .andExpect(jsonPath("$.data.applyLimit").value(updateGroup.getApplyLimit()))
                .andExpect(jsonPath("$.data.place").value(updateGroup.getPlace()))
                .andExpect(jsonPath("$.data.content").value(updateGroup.getContent()))
                .andDo(document("patch-group",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                getGroupRequestPathParameterDescriptor()
                        ),
                        requestFields(
                                getGroupPatchRequestDescriptors()
                        ),
                        responseFields(
                                getGroupResponseDescriptors()
                        )
                ));

    }
    @Test
    public void getGroupTest() throws Exception {
        //given
        long groupId =1L;
        GroupDto.Response responseDto = Stub.MockGroup.getSingleResponseBody();

        given(groupService.findGroup(Mockito.anyLong())).willReturn(new Group());
        given(groupMapper.groupToGroupResponseDto(Mockito.any(Group.class), true)).willReturn(responseDto);

        //when
        ResultActions actions = mockMvc.perform(getRequest(getUrl(), groupId));

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.groupId").value(groupId))
                .andExpect(jsonPath("$.data.groupName").value(responseDto.getGroupName()))
                .andExpect(jsonPath("$.data.groupImage").value(responseDto.getGroupImage()))
                .andExpect(jsonPath("$.data.groupZangId").value(responseDto.getGroupZangId()))
                .andExpect(jsonPath("$.data.applyLimit").value(responseDto.getApplyLimit()))
                .andExpect(jsonPath("$.data.place").value(responseDto.getPlace()))
                .andExpect(jsonPath("$.data.content").value(responseDto.getContent()))
                .andDo(document("get-group",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                getGroupRequestPathParameterDescriptor()
                        ),
                        responseFields(
                                getGroupResponseDescriptors()
                        )
                ));
    }

    @Test
    public void getGroupsTest() throws Exception {
        //given
        String pageNum = "1";

        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("pageNum", pageNum);

        Page<Group> groups = Stub.MockGroup.getMultiResultGroups();
        List<GroupDto.Response> responsesDto = Stub.MockGroup.getMultiResponseBody();

        given(groupService.findGroups(Mockito.anyInt())).willReturn(groups);
        given(groupMapper.GroupsToGroupResponseDtos(Mockito.anyList())).willReturn(responsesDto);

        //when
        ResultActions actions = mockMvc.perform(getRequest(getUrl(), queryParams));

        //then
        actions
                .andExpect(status().isOk())
                .andDo(document("get-groups",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestParameters(
                                getGroupRequestParameterDescriptors()
                        ),
                        responseFields(
                                getGroupResponseDescriptors()
                        )
                ));
    }

    @Test
    public void deleteGroupTest() throws Exception {
        //given
        long groupId = 1L;
        doNothing().when(groupService).deleteGroup(Mockito.anyLong(), Mockito.any());

        //when
        mockMvc.perform(deleteRequest(getUrl(),groupId))
                .andExpect(status().isNoContent())
                .andDo(document("delete-group",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                getGroupRequestPathParameterDescriptor()
                        )
                ));
    }
}
