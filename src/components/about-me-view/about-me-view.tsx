import React, { FunctionComponent } from "react"
import { SocialButtons } from "../social-buttons";
import { SunsetFade } from "../sunset-fade/sunset-fade";
import { ContentContainer } from "../content-container/content-container";
import { ReadableText } from "../readable-text/readable-text";
import "./about-me-view.css";

import profilePicturePath from "../../assets/profilePicture.jpg";

export const AboutMeView: FunctionComponent = () =>
    <div className="about-me-view-container">
        <SunsetFade>
            <ContentContainer>
                <div className="about-me-view-content">
                    <div className="about-me-view-left-content">
                        <img 
                            src={profilePicturePath}
                            className="about-me-view-profile-picture"
                            alt="Adam Jonsson"/>
                    </div>
                    <div className="about-me-view-right-content">
                        <div className="about-me-view-text-container">
                            <ReadableText>
                                <h2>Hello There!</h2>
                                <p>
                                    The name is Adam and I am your typical fullstack-developer 
                                    && problem solving passionate. I currently moving towards my master degree
                                    in <a 
                                        href="https://www.kth.se/en/studies/master/interactivemediatechnology/description-1.593765">
                                        Interactive Media Technology</a>.
                                </p>
                                <p>
                                    On this site, you will find my social media profiles and some of the work
                                    I have completed in conjunction with my master as well as personal projects.
                                </p>
                            </ReadableText>
                        </div>
                        <div className="about-me-view-social-profiles-container">
                            <h3>Contact & Other Profiles</h3>
                            <SocialButtons/>
                        </div>
                    </div>
                </div>
            </ContentContainer>
        </SunsetFade>
    </div>
