import * as React from "react";
import * as PropTypes from "prop-types";

import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Avatar } from "@progress/kendo-react-layout";
import { useLocalization } from "@progress/kendo-react-intl";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { locales } from "./../resources/locales";

import { AppContext } from "./../AppContext";

import headerBg from "../assets/header-bg.png";
import userAvatar from "../assets/user-avatar.jpg";

const curDate = new Date();
const projects = [
  {
    project: "양평이천1공구",
    projectId: 10001,
  },
  {
    project: "양평이천2공구",
    projectId: 10002,
  },
  {
    project: "양평이천3공구",
    projectId: 10003,
  },
];

export const Header = (props) => {
  const { onButtonClick } = props;
  const { avatar, projectId, localeId, onProjectChange } =
    React.useContext(AppContext);
  const localizationService = useLocalization();

  const currentProject = projects.find((item) => item.projectId === projectId);

  const imgRef = React.useRef(null);
  const hasImage = avatar && avatar.length > 0;

  React.useEffect(() => {
    if (hasImage) {
      var reader = new FileReader();

      reader.onload = function (e) {
        imgRef.current.setAttribute("src", e.target.result);
      };

      reader.readAsDataURL(avatar[0].getRawFile());
    }
  }, [avatar, hasImage]);

  return (
    <header className="header" style={{ backgroundImage: `url(${headerBg})` }}>
      <div className="nav-container">
        <div className="menu-button">
          <span className={"k-icon k-i-menu"} onClick={onButtonClick} />
        </div>

        <div className="title">
          <h1>{localizationService.toLanguageString("custom.title")}</h1>
        </div>

        <div className="settings">
          <span>프로젝트</span>
          <DropDownList
            style={{
              width: "500px",
            }}
            textField={"project"}
            dataItemKey={"projectId"}
            data={projects}
            value={currentProject}
            onChange={onProjectChange}
          />
        </div>
        <div className="card-date">
          <DatePicker defaultValue={curDate} defaultShow={false} />
        </div>
        {/* <Avatar type={'image'} shape={'circle'}>
                    {
                        hasImage ?
                            <img ref={imgRef} src={'#'} alt={'User Avatar'} /> :
                            <img src={userAvatar} alt="user-avatar"/>
                    }
                </Avatar> */}
      </div>
    </header>
  );
};

Header.displayName = "Header";
Header.propTypes = {
  page: PropTypes.string,
  onButtonClick: PropTypes.func,
};
