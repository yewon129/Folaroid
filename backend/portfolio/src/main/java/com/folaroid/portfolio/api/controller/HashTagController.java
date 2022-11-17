package com.folaroid.portfolio.api.controller;

import com.folaroid.portfolio.db.entity.HashTag;
import com.folaroid.portfolio.db.entity.PortfolioTemplates;
import com.folaroid.portfolio.db.repository.HashTagRepository;
import com.folaroid.portfolio.db.repository.PortfolioTemplatesRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "해시태그", tags={"HashTag"})
@RequiredArgsConstructor
@RestController
public class HashTagController {
    private final HashTagRepository hashTagRepository;
    private final PortfolioTemplatesRepository portfolioTemplatesRepository;
    @ApiOperation(value = "전체 해시태그",
            notes="조회",
            httpMethod = "GET")
    @GetMapping("/hash-tag")
    public ResponseEntity<List<HashTag>> findAllHashTag(){
        List<HashTag> hashTag = hashTagRepository.findAll();
        return new ResponseEntity<>(hashTag, HttpStatus.OK);
    }
    @ApiOperation(value = "전체 탬플릿",
            notes="조회",
            httpMethod = "GET")
    @GetMapping("/pfTemplates")
    public ResponseEntity<List<PortfolioTemplates>> findAllPortfolioTemplates(){
        List<PortfolioTemplates> portfolioTemplates = portfolioTemplatesRepository.findAll();
        return new ResponseEntity<>(portfolioTemplates, HttpStatus.OK);
    }
}
