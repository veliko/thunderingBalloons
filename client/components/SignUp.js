var SignUp = () => (
<div>
      <div>
        <label>Username</label>
        <input id='signup-username' type="text" name="username" required />
      </div>
      <div>
        <label>Password</label>
        <input id='signup-password' type="password" name="password" required />
      </div>
      <div>
        <label>Address</label>
        <input id='signup-address' type="text" name="address" required />
      </div>
      <button type="submit" value = "Submit" onClick = {() => signup()} >Submit</button>
  <p>Already have an account? <a href="/login">Login</a></p>
  <p>Or go <a href="/">home</a>.</p>
</div>
);

window.SignUp = SignUp;