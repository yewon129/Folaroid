import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProjectBody from '../../components/project/ProjectBody';
import {
    deleteProjectThunk,
    getProjectsThunk,
} from '../../modules/portfolioProject';

const ProjectBodyContainer = () => {
    const { projects } = useSelector((state) => state.portfolioProject);
    const dispatch = useDispatch();
    const {pfNo} = useParams();
    const onDeleteProject = (id) => {
        dispatch(deleteProjectThunk(id));
    };

    useEffect(() => {
        dispatch(getProjectsThunk(pfNo));
    }, [dispatch, pfNo]);

    return (
        <div>
            <ProjectBody
                projects={projects}
                onDeleteProject={onDeleteProject}
            />
        </div>
    );
};

export default ProjectBodyContainer;
