import React, { useState } from "react";
import styled from "styled-components";
import { projects } from "../../data/Constants";
// import ProjectCard from "../Cards/ProjectCards";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
`

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1100px;
    gap: 12px;
    @media (max-width: 960px) {
        flex-direction: column;
    }
`

const MainTitle = styled.div`
font-size: 42px;
text-align: center;
font-weight: 600;
margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 32px;
  }
`;

const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

const ToggleButtonGroup = styled.div`
    display: flex;
    border: 1.5px solid ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
    font-size: 16px;
    border-radius: 12px;
    font-weight: 500;
    margin: 22px 0px;
    @media (max-width: 768px) {
        font-size: 12px;
    }
`

const ToggleButton = styled.div`
    padding: 8px 18px;
    border-radius: 6px;
    cursor: pointer;
    ${({ active, theme }) =>
        active && `
    background: ${theme.primary + 20};
    `
    }
    &:hover {
        background: ${({ theme }) => theme.primary + 8};
    }
    @media (max-width: 768px) {
        padding: 6px 8px;
        border-radius: 4px;
    }
`
const Divider = styled.div`
    width: 1.5px;
    background: ${({ theme }) => theme.primary};
`

const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 28px;
    flex-wrap: wrap;
    // display: grid;
    // grid-template-columns: repeat(3, 1fr);
    // grid-gap: 32px;
    // grid-auto-rows: minmax(100px, auto);
    // @media (max-width: 960px) {
    //     grid-template-columns: repeat(2, 1fr);
    // }
    // @media (max-width: 640px) {
    //     grid-template-columns: repeat(1, 1fr);
    // }
`;


const Button = styled.button`
    display: none;
    width: 100%;
    padding: 10px;
    background-color: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.text_black};
    font-size: 14px;
    font-weight: 700;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.8s ease-in-out;
`
const Card = styled.a`
    width: 330px;
    height: 490px;
    background-color: ${({ theme }) => theme.card};
    cursor: pointer;
    text-decoration: none;
    border-radius: 10px;
    box-shadow: 0 0 12px 4px rgba(0,0,0,0.4);
    overflow: hidden;
    padding: 26px 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    transition: all 0.5s ease-in-out;
    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 0 50px 4px rgba(0,0,0,0.6);
        filter: brightness(1.1);
    }
    &:hover ${Button} {
        display: block;
    }
`
const Image = styled.img`
    width: 100%;
    height: 180px;
    background-color: ${({ theme }) => theme.white};
    border-radius: 10px;
    box-shadow: 0 0 16px 2px rgba(0,0,0,0.3);
`
const Tags = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 4px;
`
const Tag = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.primary + 15};
    padding: 2px 8px;
    border-radius: 10px;
`
const Details = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0px;
    padding: 0px 2px;
`
const Title = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_secondary};
    overflow: hidden;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`
const Date = styled.div`
    font-size: 12px;
    margin-left: 2px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary + 80};
    @media only screen and (max-width: 768px){
        font-size: 10px;
    }
`
const Description = styled.div`
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary + 99};
    overflow: hidden;
    margin-top: 8px;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
`
const Members = styled.div`
    display: flex;
    align-items: center;
    padding-left: 10px;
`
const Avatar = styled.img`
    width: 38px;
    height: 38px;
    border-radius: 50%;
    margin-left: -10px;
    background-color: ${({ theme }) => theme.white};
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    border: 3px solid ${({ theme }) => theme.card};
`

const Projects = () => {
    const [toggle, setToggle] = useState('all');

    return (
        <Container id="projects">
            <Wrapper>
                <MainTitle>Projects</MainTitle>
                <Desc>I have worked on a wide range of projects. Here are some of my projects.
                </Desc>

                <ToggleButtonGroup>
                    {toggle === 'all' ?
                        <ToggleButton active value="all" onClick={() => setToggle('all')}>All</ToggleButton>
                        :
                        <ToggleButton value="all" onClick={() => setToggle('all')}>All</ToggleButton>
                    }
                    <Divider />
                    {toggle === 'Vue Js' ?
                        <ToggleButton active value="Vue Js" onClick={() => setToggle('Vue Js')}>Vue Js</ToggleButton>
                        :
                        <ToggleButton value="Vue Js" onClick={() => setToggle('Vue Js')}>Vue Js</ToggleButton>
                    }
                    <Divider />
                    {toggle === 'Nuxt Js' ?
                        <ToggleButton active value="Nuxt Js" onClick={() => setToggle('Nuxt Js')}>Nuxt Js</ToggleButton>
                        :
                        <ToggleButton value="Nuxt Js" onClick={() => setToggle('Nuxt Js')}>Nuxt Js</ToggleButton>
                    }
                    <Divider />
                    {toggle === 'React Js' ?
                        <ToggleButton active value="React Js" onClick={() => setToggle('React Js')}>React Js</ToggleButton>
                        :
                        <ToggleButton value="React Js" onClick={() => setToggle('React Js')}>React Js</ToggleButton>
                    }
                </ToggleButtonGroup>
                <CardContainer>
                    {toggle === 'all' && projects.map((project) => (

                        <Card href={project.webapp} target="_blank">
                            <Image src={project.image} />
                            <Tags>
                                {project.tags?.map((tag, index) => (
                                    <Tag>{tag}</Tag>
                                ))}
                            </Tags>
                            <Details>
                                <Title>{project.title}</Title>
                                <Date>{project.date}</Date>
                                <Description>{project.description}</Description>
                            </Details>
                            <Members>
                                {project.member?.map((member) => (
                                    <Avatar src={member.img} />
                                ))}
                            </Members>

                        </Card>

                    ))}
                    {projects.filter((item) => item.category === toggle).map((project) => (
                        <Card href={project.webapp} target="_blank">
                            <Image src={project.image} />
                            <Tags>
                                {project.tags?.map((tag, index) => (
                                    <Tag>{tag}</Tag>
                                ))}
                            </Tags>
                            <Details>
                                <Title>{project.title}</Title>
                                <Date>{project.date}</Date>
                                <Description>{project.description}</Description>
                            </Details>
                            <Members>
                                {project.member?.map((member) => (
                                    <Avatar src={member.img} />
                                ))}
                            </Members>

                        </Card>
                    ))}
                </CardContainer>

            </Wrapper>
        </Container>
    )
}

export default Projects;