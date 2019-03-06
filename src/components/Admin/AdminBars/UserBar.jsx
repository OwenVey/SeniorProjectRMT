//#region UserBar
export class UserBar extends Component {
  constructor() {
    super();

    this.state = {
      showUserModal: false,
      invalidUser: false
    };
  }
  showAddUserModal = () => {
    this.setState({
      showUserModal: true,
      invalidUser: false
    });
  };

  hideAddUserModal = () => {
    this.setState({
      showUserModal: false,
      invalidUser: false
    });
  };

  handleOkModal = e => {
    this.setState({
      showUserModal: false
    });
  };

  handleCancelUserModal = e => {
    this.setState({
      showUserModal: false
    });
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: 15,
          marginBottom: 5,
          justifyContent: "flex-end"
        }}
      >
        <div style={{ flex: 1, justifyContent: "flex-start" }}>
          <h2>Users</h2>
        </div>
        <Button onClick={this.showAddUserModal}>
          <Icon
            type="plus-circle"
            theme="filled"
            style={{ color: "#1890FF" }}
          />
          Add User
        </Button>
        {this.state.showUserModal && (
          <AddUserModal
            addUser={this.props.addUser}
            handleCancelUserModal={this.handleCancelUserModal}
            hide={this.hideAddUserModal}
          />
        )}
      </div>
    );
  }
}
// #endregion
