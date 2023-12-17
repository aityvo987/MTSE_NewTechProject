export const MiniHeader = (props) => {
    return (
        <div style={{width:'100%', paddingLeft:'5%', paddingRight:'5%', marginBottom:'20px'}} class="row align-items-center">
            {/* <!-- User info --> */}
            <div class="col-xl-12 col-lg-12 col-md-12 col-12">
                {/* <!-- Bg --> */}
                <div class="rounded-top" style={{backgroundColor: '#ABABAB', backgroundSize: 'cover', height: '100px' }}></div>
                <div class="card px-4 pt-2 pb-4 shadow-sm rounded-top-0 rounded-bottom-0 rounded-bottom-md-2">
                    <div class="d-flex align-items-end justify-content-between">
                        <div class="d-flex align-items-center">
                            <div class="lh-1">
                                <h2 class="mb-0">{props.name}</h2>
                            </div>
                        </div>
                        <div>
                            <a href="/addcourse" class="btn btn-primary d-none d-md-block">Đăng ký đề tài</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}