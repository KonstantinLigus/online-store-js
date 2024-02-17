import "./GoogleSignInButton.scss";

const GoogleSignInButton = ({ onClick }) => (
  <button className="gsi-material-button" onClick={onClick}>
    <div className="gsi-material-button-state"></div>
    <div className="gsi-material-button-content-wrapper">
      <div className="gsi-material-button-icon">
        <svg>
          <use href="assets/icon/icon-google.svg#google" />
        </svg>
      </div>
      <span className="gsi-material-button-contents">Sign in with Google</span>
      <span style={{ display: "none" }}>Sign in with Google</span>
    </div>
  </button>
);

export default GoogleSignInButton;
