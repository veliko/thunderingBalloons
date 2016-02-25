var Login = (props) => (
<div>
      <div>
        <label>Username</label>
        <input id='login-username' type="text" name="username" required />
      </div>
      <div>
        <label>Password</label>
        <input id='login-password' type="password" name="password" required />
      </div>
      <button type="submit" value = "Submit" onClick = {() => login(props.setStates)} >Submit</button>
  <p>Need an account? <a href="/signup">Signup</a></p>
  <p>Or go <a href="/">home</a>.</p>
</div>
);

window.Login = Login;