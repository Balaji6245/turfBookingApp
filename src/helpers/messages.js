const CommonMsg = {
    validField: "Please enter valid data",
    register: "User register",
    register404: "User not register please try again later",
    emailExsist: "Email already exsist please login to continue",
    login: "Login successful",
    login404: "Please check your email or password",
    emailNotExsist: "This email not exsist please register",
    passUpdate: "Password reset",
    passUpdate404: "Unable to reset password",
    unauthorized: "Unauthorized, Invalid credentials"
}

const UserMsg = {
    user: "User",
    user404: "User not found",
    update: "Profile updated",
    update404: "Unable to update profile",
    deactivate: "Account decactivate",
    deactivate404: "Unable to deactivate account"
}

const TurfMsg = {
    created: "Turf created",
    created404: "Unable to create turf",
    turf404: "Turf not found",
    turf: "Turf detail",
    turfUpdate: "Turf updated",
    turfUpdate404: "Unable to update turf",
    deleteTurf: "Turf deleted",
    deleteTurf404: "Unable to delete turf"
}

module.exports = { CommonMsg, UserMsg, TurfMsg }