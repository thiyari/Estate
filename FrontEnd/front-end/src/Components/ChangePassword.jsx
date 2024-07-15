import Sidebar from './Sidebar/Sidebar'
function ChangePassword(){

return (
<section class="container-fluid">
            <section class="row">
                <section class="col-sm-3 border bg-light">
                      <Sidebar/>
                    GFG Column 1
                </section>
                <section class="col-sm-9 border 
                    bg-light">
                    GFG Column 2 (wider)
                </section>
            </section>
        </section>
);
}

export default ChangePassword;