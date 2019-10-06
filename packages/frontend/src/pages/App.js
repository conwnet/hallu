/**
 * @file 应用根组件
 * @author netcon
 */

import ConnectionList from './ConnectionList';
import ConnectionDrawer from './ConnectionDrawer';

const App = () => (
    <div style={{padding: 30}}>
        <ConnectionList />
        <ConnectionDrawer visible />
    </div>
);

export default App;
