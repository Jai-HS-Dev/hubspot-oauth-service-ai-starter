// Display text only: this does not authenticate a user or authorize an account.
function connectionMessage(status) {
  if (typeof status?.connected !== 'boolean') throw new Error('A connection status is required');
  return status.connected ? 'Connected (local demo).' : 'Not connected.';
}
module.exports = { connectionMessage };
