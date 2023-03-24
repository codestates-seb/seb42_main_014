package com.main.volunteer.restdocs.controller.group.group;

import org.springframework.http.MediaType;
import org.springframework.restdocs.request.ParameterDescriptor;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.util.MultiValueMap;

import java.util.List;

import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;

public interface ControllerHelper<T> {
    default RequestBuilder postRequest(String url, String content) {
        RequestBuilder requestBuilder = post(url)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("utf-8");
        if (content != null) {
            ((MockHttpServletRequestBuilder) requestBuilder).content(content);
        }
        return requestBuilder;
    }
    default RequestBuilder patchRequest(String url, long resourceId, String content) {
        return patch(url, resourceId)
               .accept(MediaType.APPLICATION_JSON)
               .contentType(MediaType.APPLICATION_JSON)
               .characterEncoding("utf-8")
               .content(content);
    }
    default RequestBuilder getRequest(String url, long resourceId) {
        return get(url, resourceId)
               .accept(MediaType.APPLICATION_JSON)
               .characterEncoding("utf-8");
    }
    default RequestBuilder getRequest(String url, MultiValueMap<String, String> queryParams) {
        return get(url)
                .params(
                        queryParams
                )
                .accept(MediaType.APPLICATION_JSON);
    }
    default RequestBuilder deleteRequest(String url, long resourceId) {
        return delete(url, resourceId);
    }
    default List<ParameterDescriptor> getGroupRequestParameterDescriptors() {
        return List.of(
                parameterWithName("pageNum").description("Page 번호"),
                parameterWithName("pageSize").description("Page 사이즈")
        );
    }
}
