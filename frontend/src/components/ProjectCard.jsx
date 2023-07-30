import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
export function ProjectCard({teamSlug, projectInfo}) {
  const {name, slug} = projectInfo;
  return (
    <Link to={`/teams/${teamSlug}/projects/${slug}`}>
    <div className="border-2 border-grey rounded-lg relative hover:shadow-lg" style={{ paddingBottom: '100%' }}>
     <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-lg font-medium">
          {name}
        </p>
      </div>
    </div>
    </Link>
  );
}