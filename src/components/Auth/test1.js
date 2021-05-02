const submitData = () => {

    setShowGG(false);
    setOk(true);

    if (isSignup) {
        dispatch(signup(formData, history)).then((result) => {

            if (result.message) {
                setProgress(false);
                setTimeout(() => {
                    if (setLinear) {
                        setLinear(false);
                    }
                }, 1000);
                setErrors(result);
            } else {
                setSuccess({ message: 'Create succesfully!' });
                setTimeout(() => {
                    setProgress(false);
                    if (setLinear) {
                        setLinear(false);
                    }
                    history.push('/');
                    return <></>
                }, 200);
            }
        }).catch((error) => {
            console.log(error);
            setProgress(false);
            setTimeout(() => {
                if (setLinear) {
                    setLinear(false);
                }
            }, 1000);
            setErrors(error);
        });


    } else {
        dispatch(signin(formData, history)).then((result) => {
            if (result.message) {
                setTimeout(() => {
                    if (setLinear) {
                        setLinear(false);
                    }
                }, 1000);
                setProgress(false);
                setErrors(result);
            } else {
                setSuccess({ message: 'Log in successfully!' });
                setTimeout(() => {
                    setProgress(false);
                    if (setLinear) {
                        setLinear(false);
                    }
                    history.push('/');
                    return <></>
                }, 200);
            }
        }).catch((error) => {
            console.log(error);
            setProgress(false);
            setTimeout(() => {
                if (setLinear) {
                    setLinear(false);
                }
            }, 1000);
            setErrors(error);
        });
    }
}