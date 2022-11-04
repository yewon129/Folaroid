package com.folaroid.portfolio.db.entity;

import lombok.*;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Builder
public class IntroCareer {

    @Id @GeneratedValue
    @Column(name="intro_career_no")
    private Long introCareerNo;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "intro_no")
    private Intro intro;

    @Column(name = "career_com_name", length = 50)
    private String careerComName;

    @Column(name = "career_job", length = 50)
    private String careerJob;

    @Column(name = "career_date")
    private String careerDate;

    @Column(name = "career_result", columnDefinition = "TEXT")
    private String careerResult;

    @Column(name = "career_detail", columnDefinition = "TEXT")
    private String careerDetail;
}
